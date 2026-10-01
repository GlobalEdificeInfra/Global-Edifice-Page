/**
 * Global Edifice — website form storage.
 *
 * Receives submissions from the website and appends each one as a row in this
 * spreadsheet. One tab per form:
 *
 *   enquiry          — the site-wide "Enquire Now" popup
 *   contact          — "Start Your Journey" / Contact Us on home, contact,
 *                      project and location pages
 *   career           — the Careers application form
 *   channel-partner  — the Channel Partner registration form
 *
 * Tabs and header rows are created automatically. When a form gains a new
 * field, the header row is extended instead of the value being dropped.
 *
 * Setup: see README.md in this folder.
 */

/** Form name (sent by the website) -> sheet tab name. */
var SHEETS = {
  enquiry: 'Enquiry',
  contact: 'Contact',
  career: 'Career',
  'channel-partner': 'Channel Partner',
};

/**
 * Optional shared secret. Set a Script Property named SHARED_TOKEN to require
 * every request to send the same value. Leave it unset to accept all requests.
 */
function getSharedToken() {
  return PropertiesService.getScriptProperties().getProperty('SHARED_TOKEN') || '';
}

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(30000);

    var payload = parseBody(e);
    var expectedToken = getSharedToken();

    if (expectedToken && payload.token !== expectedToken) {
      return jsonResponse({ ok: false, error: 'Unauthorized' });
    }

    var sheetName = SHEETS[String(payload.form || '').toLowerCase()];

    if (!sheetName) {
      return jsonResponse({ ok: false, error: 'Unknown form: ' + payload.form });
    }

    var fields = payload.data && typeof payload.data === 'object' ? payload.data : {};
    var isCareer = String(payload.form).toLowerCase() === 'career';
    var resume = null;

    // The uploaded PDF arrives base64-encoded; store it in Drive and keep only its link.
    if (isCareer && fields.resumeFile) {
      resume = saveResumeToDrive(fields.resumeFile, fields.fullName);
      fields.resumeFile = resume.url;
    }

    appendRow(sheetName, fields, payload);

    if (isCareer) {
      return jsonResponse({ ok: true, email: emailCareerApplication(fields, resume) });
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  } finally {
    try {
      lock.releaseLock();
    } catch (releaseError) {
      // Lock was never acquired; nothing to release.
    }
  }
}

/** Lets you open the web app URL in a browser to check it is deployed. */
function doGet() {
  var resumeFolder = 'ok';

  try {
    getResumeFolder();
  } catch (error) {
    resumeFolder = 'error: ' + String(error);
  }

  return jsonResponse({
    ok: true,
    status: 'Global Edifice form endpoint is running',
    resumeFolder: resumeFolder,
  });
}

/**
 * Where careers applications are emailed.
 * Set MODE to 'test' while testing, and to 'prod' when going live.
 */
var MODE = 'prod';
var CAREERS_EMAILS = {
  test: 'seetharamugn@gmail.com',
  prod: 'careers@globaledifice.com',
};
var CAREERS_EMAIL = CAREERS_EMAILS[MODE];

/**
 * Run this once from the Apps Script editor (select it, then click Run). It asks
 * Google for permission to send email and sends a test to CAREERS_EMAIL.
 */
function testCareerEmail() {
  // A minimal one-page PDF, so the test needs no conversion service.
  var pdf = Utilities.newBlob(
    '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n' +
      '2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n' +
      '3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 300 100]/Contents 4 0 R' +
      '/Resources<</Font<</F1<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>>>>>>>endobj\n' +
      '4 0 obj<</Length 44>>stream\nBT /F1 18 Tf 20 50 Td (Test resume) Tj ET\nendstream endobj\n' +
      'trailer<</Root 1 0 R>>\n%%EOF',
    'application/pdf',
    'test-resume.pdf',
  );
  var fields = {
    fullName: 'TEST - ignore',
    email: '',
    phone: '',
    location: '',
    resumeLink: '',
  };
  var resume = saveResumeToDrive(
    { name: 'test-resume.pdf', base64: Utilities.base64Encode(pdf.getBytes()) },
    fields.fullName,
  );
  Logger.log(emailCareerApplication(fields, resume));
}

/**
 * Emails each careers application to the HR inbox, with the resume PDF attached.
 * Returns "sent" or the error, so failures show up in the web app response.
 */
function emailCareerApplication(fields, resume) {
  try {
    var lines = [
      'A new careers application was submitted on the website.',
      '',
      'Name: ' + (fields.fullName || ''),
      'Email: ' + (fields.email || ''),
      'Phone: ' + (fields.phone || ''),
      'Location: ' + (fields.location || ''),
      'Resume link: ' + (fields.resumeLink || '-'),
      'Resume file (Drive): ' + (resume ? resume.url : '-'),
    ];
    var options = { name: 'Global Edifice Website' };

    if (resume) {
      options.attachments = [resume.blob];
    }

    if (fields.email) {
      options.replyTo = String(fields.email);
    }

    MailApp.sendEmail(
      CAREERS_EMAIL,
      (MODE === 'test' ? '[TEST] ' : '') +
        'New careers application: ' + (fields.fullName || 'Applicant'),
      lines.join('\n'),
      options,
    );
    return 'sent';
  } catch (error) {
    // The row is already saved in the sheet; never fail the submission over email.
    return 'error: ' + String(error);
  }
}

/** Drive folder (in the script owner's Drive) where uploaded resumes are kept. */
var RESUME_FOLDER_NAME = 'Global Edifice - Careers Resumes';
var MAX_RESUME_BYTES = 5 * 1024 * 1024;

function getResumeFolder() {
  var folders = DriveApp.getFoldersByName(RESUME_FOLDER_NAME);
  var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(RESUME_FOLDER_NAME);

  shareResumeFolder(folder);
  return folder;
}

/**
 * Gives the careers inbox view access to the resume folder (and so to every
 * resume in it), so the Drive links in the emails open for them.
 */
function shareResumeFolder(folder) {
  var email = CAREERS_EMAILS.prod.toLowerCase();
  var people = folder.getViewers().concat(folder.getEditors());
  var hasAccess = people.some(function (user) {
    return user.getEmail().toLowerCase() === email;
  });

  if (!hasAccess) {
    folder.addViewer(email);
  }
}

/** Saves an uploaded PDF ({ name, base64 }) to Drive. Returns { url, blob }. */
function saveResumeToDrive(file, applicantName) {
  var bytes = Utilities.base64Decode(String(file.base64 || ''));

  if (!bytes.length) {
    throw new Error('Resume file is empty');
  }
  if (bytes.length > MAX_RESUME_BYTES) {
    throw new Error('Resume file is larger than 5 MB');
  }

  var stamp = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HHmm');
  var safeName = String(applicantName || 'Applicant').replace(/[^\w .-]+/g, '').trim() || 'Applicant';
  var name = safeName + ' - ' + stamp + ' - ' + String(file.name || 'resume.pdf');
  var blob = Utilities.newBlob(bytes, 'application/pdf', name);
  var saved = getResumeFolder().createFile(blob);

  return { url: saved.getUrl(), blob: blob };
}

function parseBody(e) {
  if (e && e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }

  if (e && e.parameter && e.parameter.payload) {
    return JSON.parse(e.parameter.payload);
  }

  return {};
}

function appendRow(sheetName, fields, payload) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  var row = {
    'Submitted At': new Date(),
    Page: payload.page || '',
  };

  Object.keys(fields).forEach(function (key) {
    row[toHeading(key)] = formatValue(fields[key]);
  });

  var headers = readHeaders(sheet);
  var newHeaders = Object.keys(row).filter(function (heading) {
    return headers.indexOf(heading) === -1;
  });

  if (newHeaders.length) {
    headers = headers.concat(newHeaders);
    writeHeaders(sheet, headers);
  }

  var values = headers.map(function (heading) {
    return Object.prototype.hasOwnProperty.call(row, heading) ? row[heading] : '';
  });

  sheet.appendRow(values);
}

function readHeaders(sheet) {
  if (sheet.getLastRow() === 0 || sheet.getLastColumn() === 0) {
    return [];
  }

  return sheet
    .getRange(1, 1, 1, sheet.getLastColumn())
    .getValues()[0]
    .filter(function (heading) {
      return heading !== '';
    });
}

function writeHeaders(sheet, headers) {
  var range = sheet.getRange(1, 1, 1, headers.length);

  range.setValues([headers]);
  range.setFontWeight('bold');
  sheet.setFrozenRows(1);
}

/** "fullName" / "full_name" -> "Full Name", so the sheet stays readable. */
function toHeading(key) {
  var spaced = String(key)
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .trim();

  return spaced.replace(/\b\w/g, function (character) {
    return character.toUpperCase();
  });
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/** Checkbox groups arrive as arrays; keep them readable in one cell. */
function formatValue(value) {
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return value;
}
