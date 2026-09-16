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

    appendRow(sheetName, fields, payload);

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
  return jsonResponse({ ok: true, status: 'Global Edifice form endpoint is running' });
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
