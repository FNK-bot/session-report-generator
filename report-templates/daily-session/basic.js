const SessionModel = require('../../models/sessionDetailsModel');
const UserModel = require('../../models/userModel')

const normalTemplate = async (
    sessionId,
    date,
    sessionOverview,
    attendees,
    tldvLink,
    userName
) => {
    try {

        // Fetch session details from the database
        const sessionDetails = await SessionModel.findOne({ userId: sessionId });
        console.log(sessionDetails)
        if (!sessionDetails) {
            throw new Error('Session not found');
        }


        // Extract necessary data from session details
        const { students, trainer, coordinators, batch } = sessionDetails;
        attendees = Array.isArray(attendees) ? attendees.map(s => s.trim().toUpperCase()) : [attendees.trim().toUpperCase()];
        // Calculate absentees
        const absentees = students.filter(student => !attendees.includes(student));
        const attendeeCount = attendees.length;
        const absenteeCount = absentees.length;

        // Generate the report
        const report = `
🌟 Session Report 🌟

🗓 Date: ${date}
⚔️ Batch:${batch.map(name => `${name}`).join(',')}

👨‍🏫 Trainer: ${trainer}
👩🏻‍💻 coordinator: ${coordinators.map(name => `${name}`).join(',')}

📋 Overview: ${sessionOverview}

👩‍🎓👨‍🎓 Total Students: ${students.length}
✅ Present: ${attendeeCount}
❌ Absent: ${absenteeCount}

👩‍🎓👨‍🎓 Attendees:
${attendees.map(name => `- ${name} ✅`).join('\n')}

🚫 Absentees:
${absentees.map(name => `- ${name} ❌`).join('\n')}

🔗 Recording: ${tldvLink}

✍️ Report Prepared By: ${userName}
        `;

        return report;
    } catch (error) {
        console.error('Error generating session report:', error.message);
        throw new Error('Could not generate session report. ' + error.message);
    }
};


module.exports = normalTemplate;
