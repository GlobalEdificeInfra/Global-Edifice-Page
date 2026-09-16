# Storing website forms in Google Sheets

Every submission from the website is appended to one Google Sheet, with a tab per form:

| Tab | Form on the website |
| --- | --- |
| `Enquiry` | "Enquire Now" popup |
| `Contact` | "Start Your Journey" / Contact Us (home, contact, project and location pages) |
| `Career` | Careers application form |
| `Channel Partner` | Channel Partner registration form |

The enquiry and contact forms still send leads to the Paramantra CRM as before. The sheet is an extra copy, and is the only storage for the careers and channel partner forms.

## 1. Create the sheet and script

1. Create a new Google Sheet (name it e.g. "Global Edifice — Website Forms").
2. In the sheet, choose **Extensions → Apps Script**.
3. Delete the sample code, paste in everything from `Code.gs` in this folder, and save.

The tabs and their header rows are created automatically on the first submission, so there is nothing to set up by hand.

## 2. Deploy it as a web app

1. In Apps Script, click **Deploy → New deployment**.
2. Choose type **Web app**.
3. Set **Execute as: Me**, and **Who has access: Anyone**.
4. Click **Deploy** and approve the permissions Google asks for.
5. Copy the **Web app URL**. It ends in `/exec`.

"Anyone" is required so the website can post to it without a Google login. The script can only append rows to this one sheet.

## 3. Connect the website

Add the URL to the site's environment variables (in Vercel, and in a local `.env` file for testing):

```
VITE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
VITE_SHEETS_TOKEN=
```

Redeploy the site after adding it. If the URL is missing, forms still work: enquiry and contact leads go to the CRM as usual, and nothing is written to the sheet.

## 4. Optional: a shared password

The web app URL is visible in the website's code, so anyone who finds it could post rows to the sheet. To reduce that:

1. In Apps Script, go to **Project Settings → Script Properties → Add script property**.
2. Name it `SHARED_TOKEN`, and set any long random value.
3. Put the same value in `VITE_SHEETS_TOKEN` in the website's environment variables.

Requests without the matching value are then rejected. Note this is only a light deterrent, since the value is still present in the website's code. For real protection the submission would need to go through the site's own server instead; ask if you want that.

## Updating the script later

After editing `Code.gs` in Apps Script, choose **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**. The URL stays the same. If you create a *new* deployment instead, the URL changes and must be updated in the environment variables.

## Checking it works

- Open the web app URL in a browser. It should show `{"ok":true,"status":"Global Edifice form endpoint is running"}`.
- Submit each form on the site and confirm a new row appears in the matching tab.
