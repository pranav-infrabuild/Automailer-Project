# 📧 AutoMailer: Scheduled Email Automation via Google Apps Script

🎯 *AutoMailer* automates your HR/outreach workflow by sending personalized emails with attachments, all controlled from a Google Sheet — with built-in scheduling support!

---

## 🚀 Features

✨ *Automated Messaging*  
📩 Send personalized emails using names and emails from a sheet

📎 *File Attachment Support*  
Attach a *PDF* file (e.g., resume) from Google Drive

🔄 *Dynamic Personalization*  
Auto-replace Name in the message body with the recipient’s name

⏰ *Custom Scheduling*  
Schedule your campaign by entering a time (HH:mm) in the spreadsheet

🛡️ *Safe Execution*  
Skips any row with missing name or email

---

## 📁 Project Structure

---

## 📊 Spreadsheet Layout

### 1. Sheet: HrList

| 📧 Email            | 👤 Name   |
|---------------------|----------|
| user1@email.com     | Mahesh   |
| user2@email.com     | Priya    |
| user3@email.com     | Aman     |

✔️ First row is header  
✔️ Email and name are required in each row

---

### 2. Sheet: MailContent

| 🏷️ Label                  | 📝 Value                                     |
|---------------------------|---------------------------------------------|
| Subject                   | Job Opportunity - Resume Submission         |
| Body                      | Hello Name, Please find my resume attached. |
| Resume File ID            | 1abcDefGhiJKlmnOpQRstuvWXyz1234567890abc     |
| Scheduled Time (HH:mm)    | 20:45                                       |

💡 Use Name in the message to dynamically replace with real names  
📁 Resume File ID must be a valid Google Drive file ID  
🕐 Time must be in 24-hour format HH:mm

---
## 📂 How to Find Google Drive File ID & Attach It

This section shows you how to get the correct File ID from Google Drive and link it in your spreadsheet so the script can attach your PDF file to each email.

### ✅ Step 1: Upload the File

📁 Go to [Google Drive](https://drive.google.com)  
⬆️ Upload the *PDF file* you want to send (e.g., your resume)

---

### ✅ Step 2: Get the Shareable Link

1. 🔍 Right-click on the uploaded file  
2. Click *Get link*
3. 🛡️ In the access dropdown, select:  
   *→ “Anyone with the link”*  
   *→ “Viewer” permission*
4. 🔗 Click *Copy link*

---
### ✅ Step 3: Extract the File ID
From URL
- | Extract File ID
- | Copy the part between /d/ and /view in the Drive URL
- 💡 Example:
https://drive.google.com/file/d/1a2B3cD4EfGhIjKlMnOpQrStUvWxYz/view?usp=sharing
- File ID - 1a2B3cD4EfGhIjKlMnOpQrStUvWxYz

### ✅ Step 4: Paste the File ID in the Spreadsheet

📝 Open your AutoMails.xlsx or linked Google Sheet.

Go to the MailContent sheet:

| Cell   | What to Enter               |
|--------|-----------------------------|
| B4   | Paste your File ID here     |

💡 Example:

---
## 📦 *Ready-to-use test data:*  
✅ Included in [AutoMails.xlsx](./AutoMails.xlsx)  
✅ Pre-filled rows in both HrList and MailContent  
✅ Test immediately without extra setup!

---
## 🛠️ How to Create Code.gs in Google Apps Script

To automate email sending, you need to copy and paste the provided script into your Google Spreadsheet's Apps Script editor.

---

### ✅ Step-by-Step Instructions

### 1️⃣ Open Your Spreadsheet

📂 Open your spreadsheet file (e.g., AutoMails.xlsx if imported to Google Sheets)

---

### 2️⃣ Go to Apps Script Editor

🧩 Click on the top menu:  
*Extensions → Apps Script*

This will open the Google Apps Script editor in a new tab.

---

### 3️⃣ Delete Default Code

🗑 You'll see a default file called Code.gs with a function myFunction() in it.  
🔸 Delete all existing code in that file.

---

### 4️⃣ Paste Provided Script

📝 Copy the full content from [Code.gs](./Code.gs)  
📋 Paste it inside the editor

It should include both functions:
- myFunction() – for sending emails
- scheduleMyFunctionFromSheetTime() – for scheduling them

---

### 5️⃣ Save the Script

💾 Click the *💾 Save* icon or press Ctrl + S / Cmd + S  
🔤 Give your project a name like: AutoMailer Script

---

### 6️⃣ Grant Permissions

🔐 Click the *▶️ Run* button for scheduleMyFunctionFromSheetTime()  
A Google Authorization popup will appear.

🔒 Grant the required permissions to:
- Send emails
- Access Google Drive
- Access your spreadsheets

✅ Once granted, your script is ready to automate!

---

### 🔁 Next Step

Now your script is live and connected. You just need to:
- Fill in the sheet with correct data
- Run the scheduleMyFunctionFromSheetTime() function once
- Sit back and let the automation work 🪄

---

💡 Tip: You can always come back to the script via  
*Extensions → Apps Script* to update logic or troubleshoot.

---
## 🧠 How It Works
This project runs two core functions from Code.gs:

### 🔁 myFunction()
- 📄 Reads all rows from the HrList sheet
- 🔤 Replaces the placeholder Name in the message body
- 📧 Sends a personalized email with:
  - Dynamic subject & body
  - Attached PDF file from Google Drive

### ⏰ scheduleMyFunctionFromSheetTime()
- 🕓 Reads scheduled time from MailContent!B5 (e.g., 20:45)
- 🔄 Creates a one-time *time-based trigger* to run myFunction() at that time
- 📆 If time has already passed for today, it schedules the trigger for tomorrow

---

📦 *Ready-to-use test data:*  
✅ Included in [AutoMails.xlsx](./AutoMails.xlsx)  
✅ Pre-filled rows in both HrList and MailContent  
✅ Test immediately without extra setup!

---

## ⚙️ Setup Guide

### ✅ Step 1: Prepare Sheet
- Fill in all rows in HrList and values in MailContent

### ✅ Step 2: Open Apps Script
- Go to *Extensions > Apps Script*
- Paste the content from Code.gs

### ✅ Step 3: Authorize Script
- Allow access to Gmail and Google Drive

### ✅ Step 4: Run Scheduler
- Run scheduleMyFunctionFromSheetTime() once
- Script will send emails daily at your scheduled time

---

## 🔐 Required Permissions

| Scope       | Purpose               |
|-------------|------------------------|
| MailApp   | To send emails         |
| DriveApp  | To fetch attached file |

---

## ⚠️ Notes

- Name in body will be replaced with the actual recipient's name
- If the scheduled time has passed today, emails will be sent tomorrow
- PDF must be accessible from your Google Drive

---

## 📦 Sample Sheet

📁 [AutoMails.xlsx](./AutoMails.xlsx)  
Includes ready-made data for testing

---
⭐ Star this repo if you find it helpful!
