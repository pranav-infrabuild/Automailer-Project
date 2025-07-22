// 🔁 MAIN FUNCTION: Sends personalized emails with attachment
function myFunction() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hrSheet = ss.getSheetByName("HrList");
  const contentSheet = ss.getSheetByName("MailContent");

  const hrData = hrSheet.getDataRange().getValues();
  const subject = contentSheet.getRange("B2").getValue();
  const bodyTemplate = contentSheet.getRange("B3").getValue();
  const fileId = contentSheet.getRange("B4").getValue();
  const file = DriveApp.getFileById(fileId);

  for (let i = 1; i < hrData.length; i++) {
    const email = hrData[i][0];
    const name = hrData[i][1];

    if (email && name) {
      const personalizedBody = bodyTemplate.replace("Name", name);

      MailApp.sendEmail({
        to: email,
        subject: subject,
        body: personalizedBody,
        attachments: [file.getAs(MimeType.PDF)],
      });
    }
  }
}

// ⏰ SCHEDULER FUNCTION: Reads time from MailContent!B5 and schedules myFunction
function scheduleMyFunctionFromSheetTime() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const contentSheet = ss.getSheetByName("MailContent");
  const timeString = contentSheet.getRange("B5").getValue();

  if (!timeString || typeof timeString !== "string" || !timeString.includes(":")) {
    throw new Error("Invalid time format in B5. Expected HH:mm (e.g., 20:45)");
  }

  const [hours, minutes] = timeString.split(":").map(Number);
  const now = new Date();
  const scheduledTime = new Date();

  scheduledTime.setHours(hours);
  scheduledTime.setMinutes(minutes);
  scheduledTime.setSeconds(0);
  scheduledTime.setMilliseconds(0);

  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const triggers = ScriptApp.getProjectTriggers();
  for (let trigger of triggers) {
    if (trigger.getHandlerFunction() === "myFunction") {
      ScriptApp.deleteTrigger(trigger);
    }
  }

  ScriptApp.newTrigger("myFunction")
    .timeBased()
    .at(scheduledTime)
    .create();
}
