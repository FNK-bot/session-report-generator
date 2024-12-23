

const getResult = (req, res) => {
    try {
        const { sessionOverview, attendees = [], tldvLink } = req.body;
        const absentees = ['Reshma', 'Tony', 'Midhun', 'Mammen', 'Farseen'].filter(name => !attendees.includes(name));

        const report = `
      🌟 Session Report 🌟
      
      📋 Overview: ${sessionOverview}
      
      👩‍🎓👨‍🎓 Attendees:
      ${attendees.map(name => `- ${name} ✅`).join('\n')}
      
      🚫 Absentees:
      ${absentees.map(name => `- ${name} ❌`).join('\n')}
      
      🔗 Recording: ${tldvLink}
      `;

        res.render('user-views/result', { report });
    } catch (error) {
        console.error(`error in get result`, error);
    }
};


module.exports = {
    getResult
}