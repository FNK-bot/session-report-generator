const SessionModel = require('../../models/sessionDetailsModel');
const UserModel = require('../../models/userModel')

const normalTemplate = async (
    sessionId,
    date,
    audioTaskOverview,
    submitions,
    userName
) => {
    try {

        // Fetch session details from the database
        const sessionDetails = await SessionModel.findOne({ userId: sessionId });

        if (!sessionDetails) {
            throw new Error('Session not found');
        }


        // Extract necessary data from session details
        const { students, trainer, coordinators, batch } = sessionDetails;
        submitions = Array.isArray(submitions) ? submitions.map(s => s.trim().toUpperCase()) : [submitions.trim().toUpperCase()];
        // Calculate notSubmited
        const notSubmited = students.filter(student => !submitions.includes(student));
        const submitedCount = submitions.length;
        const notSubmitedCount = notSubmited.length;

        // Generate the report
        const report = `
🌟 Audio Task Report 🌟

🗓 Date: ${date}
⚔️ Batch:${batch.map(name => `${name}`).join(',')}

👨‍🏫 Trainer: ${trainer}
👩🏻‍💻 coordinator: ${coordinators.map(name => `${name}`).join(',')}

📋 Overview: ${audioTaskOverview}

👩‍🎓👨‍🎓 Total Students: ${students.length}
✅ Submited: ${submitedCount}
❌ Not Submited: ${notSubmitedCount}

👩‍🎓👨‍🎓 Submited Students:
${submitions.map(name => `- ${name} ✅`).join('\n')}

🚫 Not Submited:
${notSubmited.map(name => `- ${name} ❌`).join('\n')}

✍️ Report Prepared By: ${userName}
        `;

        return report;
    } catch (error) {
        console.error('Error generating session report:', error.message);
        throw new Error('Could not generate session report. ' + error.message);
    }
};


module.exports = normalTemplate;
