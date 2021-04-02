const fs = require('fs-extra')

module.exports = welcome = async (tobz, event) => {
    //console.log(event.action)
    const welkom = JSON.parse(fs.readFileSync('./lib/database/welcome.json'))
    const isWelkom = welkom.includes(event.chat)
    try {
        if (event.action == 'add' && isWelkom) {
            const gChat = await tobz.getChatById(event.chat)
            const pChat = await tobz.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await tobz.getProfilePicFromServer(event.who)
            const capt = `Hola! @${event.who.replace('@c.us', '')} 👋\nBienvenido a *Grup ${name}*\n═══════════════════\nEs OBLIGATORIO presentarse con NOMBRE, EDAD y LUGAR para permanecer en el grupo!

⚠️ SI HACES SPAM TE DEJAMOS SIN WHATSAPP + GRUPO / INSTAGRAM⚠️
Recuerda leer las normas de la descripción.

protegido por: 
L̴͕̰̠̤̃̒̒ḛ̵̠̟̠͆̓̎n̴̘͈͊͛͗͝a̶̛͓͊ A̵n̴o̶n̷y̶m̸i̶s̴s̶          ☦︎⪻̤̈N̴͖e̵͠b̷̛̈́á̴̬̌l̶͐́o̸͡⪼̤̈☦︎
⠀⠀⠀   ⠀☦︎⪻̤̈M̸̞̱̜͒̈͑̐̈́̇•̴̻̖̼͓͈̀̈́̈̓̍̔̚ͅT̴̤̩̀͑̄͗̒͑̕ḩ̸͇͔̑͒́͌̄e̷̙̱̎•̷̔̓̉̽̑̕̕H̶͔̰͑å̷͙̹̾͝͝ť̵̎͐́̏̒̈ë̶̛͖͓̙͎́́ṛ̷̊̊⪼̤̈☦︎̤̈.\n═══════════════════\n`
            
            if (pepe == '' || pepe == undefined) {
                await tobz.sendFileFromUrl(event.chat, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU', 'profile.jpg')
            } else {
                await tobz.sendFileFromUrl(event.chat, pepe, 'profile.jpg')
                tobz.sendTextWithMentions(event.chat, capt)
            }

        }
    } catch (err) {
        console.log(err)
    }
}
