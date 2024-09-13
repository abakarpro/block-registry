import { jsPDF } from "jspdf"; // will automatically load the node version
//import { useState } from "react";
import QRCode from "qrcode";

var fontSizes = {
    HeadTitleFontSize: 20,
    Head2TitleFontSize: 18,
    TitleFontSize: 14,
    SubTitleFontSize: 12,
    NormalFontSize: 11,
    SmallFontSize: 8
  }
  
  var fontStyles = {
    Normal: "normal",
    Bold: "bold",
    Italic: "italic"
  }

  const generatePDF = async ({id, filename = 'acte.pdf' ,  data = [] }) => {
    return new Promise((resolve, reject) => {
//c//onst [imageUrl, setImageUrl] = useState('');

    //const {jsPDF} = window.jspdf;
    const doc = new jsPDF('p', 'pt')
    var InitialstartX = 40;
    var startX = 140;
   // var InitialstartY = 40;
   // var startY = 0;
    //var lineHeights = 12;
    var centerStart=0;
    var endCenter=0;
  //  var endCenterEng=0;
    var myFont = "helvetica";
    var startActe = 160;
    var startCentre = 110;
    var interline = 20;
    var myFont2 = "Times";
    const textRepublicFr ="REPUBLIQUE DU CAMEROUN";
       const textRepublicEng =" REPUBLIC OF CAMEROON ";
    filename= "acte"+ id + ".pdf";
    function setLines(startX, startYline) {
      const end_X = doc.internal.pageSize.getWidth() - InitialstartX; // Marge de 10 à droite     
      doc.setLineDash([1, 3], 0); // Définir un motif de pointillés
      const startY = startActe + interline * startYline;
      doc.line(startX, startY, end_X, startY);// Dessiner une ligne horizontale en pointillés
    }


    function setText1(labelFr, labelEng, myText, startY) {
      doc.setFont(myFont, fontStyles.Bold);
      doc.setFontSize(fontSizes.NormalFontSize);

      doc.text(labelFr, startX, startActe + interline * startY);
      doc.setFont(myFont2, fontStyles.Italic);
      const labelFrWidth = startX + doc.getTextWidth(labelFr);
      const labelAllWidth = 1.2 * startX + doc.getTextWidth(labelFr + labelEng);
      doc.text(myText, labelAllWidth, startActe + interline * startY);
      doc.setFont(myFont, fontStyles.Normal);
      doc.text(labelEng, labelFrWidth + 10, startActe + interline * startY);
      setLines(labelAllWidth, startY + 0.1);
    }

    function setTextCenter(labelFr, labelEng, myText, startY) {      
      doc.setFontSize(fontSizes.NormalFontSize);         
      const labelFrWidth =  doc.getTextWidth(labelFr);
      const myTextWidth =  doc.getTextWidth(myText);
      const labelAllWidth =  doc.getTextWidth(labelFr + labelEng );
      const center = ((doc.internal.pageSize.width / 2) - ((labelAllWidth + myTextWidth)/ 2));      
      doc.setFont(myFont, fontStyles.Bold);
      doc.text(labelFr, center + labelFrWidth, startActe + interline * startY);
      doc.setFont(myFont, fontStyles.Normal);
      doc.text(labelEng, center + 2*labelFrWidth , startActe + interline * startY);
      doc.setFont(myFont2, fontStyles.Italic);
      doc.text(myText, center + 2*labelAllWidth , startActe + interline * startY);      
      setLineToText(labelAllWidth, myTextWidth, interline *  startY)
    }

    function setTextCenter2Start(labelFr, labelEng, startY, fontStyle) {      
      doc.setFontSize(fontSizes.NormalFontSize);         
    //  const labelFrWidth =  doc.getTextWidth(labelFr);
     // const labelAllWidth =  doc.getTextWidth(labelFr + labelEng );
    //  const center = startActe;//((doc.internal.pageSize.width / 2) - ((labelAllWidth + myTextWidth)/ 2));      
      doc.setFont(myFont, fontStyle);
      const startCenter= (doc.getTextWidth(textRepublicFr) /2) - (doc.getTextWidth(labelFr) / 2);
      doc.text(labelFr, startX +startCenter, startActe + interline * startY);
      doc.setFont(myFont, fontStyles.Italic);

      const centerFr = (doc.getTextWidth(labelFr) / 2) - (doc.getTextWidth(labelEng) / 2);
      doc.text(labelEng, startX +startCenter +centerFr, startActe + interline * (startY + 0.6));      
    }

    function setTextStart(labelFr, labelEng, startY) {      
        doc.setFontSize(fontSizes.NormalFontSize);         
       // const labelFrWidth =  doc.getTextWidth(labelFr);
      //  const myTextWidth =  doc.getTextWidth(myText);
      //  const labelAllWidth =  doc.getTextWidth(labelFr + labelEng );
       // const center = startActe;//((doc.internal.pageSize.width / 2) - ((labelAllWidth + myTextWidth)/ 2));      
        doc.setFont(myFont, fontStyles.Normal);
        doc.text(labelFr, startX, startActe + interline * startY);
        doc.setFont(myFont, fontStyles.Italic);
        centerStart = (doc.getTextWidth(labelFr) / 2) - (doc.getTextWidth(labelEng) / 2);
        doc.text(labelEng, startX + centerStart, startActe + interline * (startY + 0.6));      
      }

      function setTextEndCenter(labelFr, labelEng, startY) {      
        doc.setFontSize(fontSizes.NormalFontSize);         
        const labelFrWidth =  doc.getTextWidth(labelFr);
        const center = (doc.internal.pageSize.width - labelFrWidth * 1.2);  //((labelAllWidth + myTextWidth)/ 2));      
        doc.setFont(myFont, fontStyles.Normal);
        doc.text(labelFr, center, startActe + interline * startY);
        doc.setFont(myFont, fontStyles.Italic);
        endCenter = (doc.getTextWidth(labelFr) / 2) - (doc.getTextWidth(labelEng) / 2);
        doc.text(labelEng, center + endCenter, startActe + interline * (startY + 0.6)); 
      }
      
    function setTextCenter2End(labelFr, labelEng, startY, fontStyle) {      
      doc.setFontSize(fontSizes.NormalFontSize);         
      const labelFrWidth =  doc.getTextWidth(textRepublicEng);   
      const center = (doc.internal.pageSize.width -  labelFrWidth * 1.2);  //((labelAllWidth + myTextWidth)/ 2));      
      doc.setFont(myFont, fontStyle);
      const centerFr = (doc.getTextWidth(textRepublicEng) / 2) - (doc.getTextWidth(labelFr) / 2);
      doc.text(labelFr,  center + centerFr, startActe + interline * startY);
      doc.setFont(myFont, fontStyles.Italic);
      const centerEng = (doc.getTextWidth(textRepublicEng) / 2) - (doc.getTextWidth(labelEng) / 2);
        doc.text(labelEng, center + centerEng, startActe + interline * (startY + 0.6)); 
    }

    function setText2(labelFr, labelEng, myText, startY) {
      doc.setFont(myFont, fontStyles.Bold);
      doc.setFontSize(fontSizes.NormalFontSize);

      doc.text(labelFr, startX, startActe + interline * startY);
      doc.setFont(myFont2, fontStyles.Italic);
      const labelFrWidth = 1.2 * startX + doc.getTextWidth(labelFr);

      doc.text(myText, labelFrWidth, startActe + interline * startY);
      doc.setFont(myFont, fontStyles.Normal);

      doc.text(labelEng, startX, startActe + interline * (startY + 0.6));
      setLines(labelFrWidth, startY + 0.1);
    }


    function setText(labelFr, labelEng, myText, startY) {
      doc.setFont(myFont, fontStyles.Bold);
      doc.setFontSize(fontSizes.NormalFontSize);

      doc.text(labelFr, startX, startActe + interline * startY);
      doc.setFont(myFont2, fontStyles.Italic);
      const labelFrWidth = startX + doc.getTextWidth(labelFr);
      const labelAllWidth = 1.2 * startX + doc.getTextWidth(labelFr + labelEng);
      doc.text(myText, labelAllWidth, startActe + interline * startY);
      doc.setFont(myFont, fontStyles.Normal);
      doc.text(labelEng, labelFrWidth + 10, startActe + interline * startY);
    }

    function setTextEnd(myText, startY) {
      doc.setFont(myFont, fontStyles.Bold);
      doc.setFontSize(fontSizes.NormalFontSize);

      doc.setFont(myFont, fontStyles.Bold);
      const myTextWidth = doc.getTextWidth(myText);
      const endStart = (doc.internal.pageSize.width - myTextWidth - startX / 2);
      doc.text(myText, endStart, startActe + interline * startY);
    }

    function setLineToText(labelTextWidth, myTextWidth, startY) {
      const end_X = 1.2 * startActe + labelTextWidth + myTextWidth ; // Marge de 10 à droite     
      doc.setLineDash([1, 3], 0); // Définir un motif de pointillés
      const start_Y = startActe + startY + 2;
      const center = ((doc.internal.pageSize.width / 2) - (labelTextWidth + myTextWidth) / 2);
      doc.line(labelTextWidth + myTextWidth + center, start_Y, end_X, start_Y);// Dessiner une ligne horizontale en pointillés
    }

   function setTextHeader(labFr, labEng, startY){
      doc.setFont(myFont, fontStyles.Bold);      //const acte = "ACTE DE NAISSANCE / ";
      const labFrWidth = doc.getTextWidth(labFr);
      doc.text(labFr, startX, startCentre * startY);      // Définir la police normal
      doc.setFont(myFont, fontStyles.Normal);
      doc.text(labEng, startX + labFrWidth, startCentre * startY);  
    }

  


    setTextStart("REPUPLIQUE DU CAMEROUN", "Paix-Travail-Patrie", -7);
    setTextEndCenter("REPUBLIC OF CAMEROON", "Peace-Work-Fatherland", -7);

    setTextCenter2Start("REGION", "CENTRE", -5.5, fontStyles.Bold);
    setTextCenter2End("REGION", "CENTER", -5.5, fontStyles.Bold);

    setTextCenter2Start("DEPARTEMENT", "MFOUNDI", -4, fontStyles.Bold);
    setTextCenter2End("DIVISION", "MFOUNDI", -4, fontStyles.Bold);

    setTextCenter2Start("ARRONDISSEMENT", "YAOUNDE I", -2.5, fontStyles.Bold);
    setTextCenter2End("SUBDIVISION", "YAOUNDE I", -2.5, fontStyles.Bold);
  
    doc.setFontSize(fontSizes.TitleFontSize);
    const labCentre = "CENTRE D'ETAT-CIVIL / ";
    const labCentreEng = " CIVIL STATUS REGISTRATION CENTRE";   
   setTextHeader(labCentre , labCentreEng, 1.3);
   setText1("de - ", "Of", data.centre, -0.2);

    doc.setFontSize(fontSizes.HeadTitleFontSize);
     const acte = "ACTE DE NAISSANCE / ";
    const acteEng ="BIRTH CERTIFICATE";
    setTextHeader(acte , acteEng, 1.65);
    // doc.setFont(myFont, fontStyles.Bold);
    
    // const acteWidth = doc.getTextWidth(acte);
    // doc.text(acte, startX, startActe);
    // // Définir la police normal
    // doc.setFont(myFont, fontStyles.Normal);
    // doc.text("BIRTH CERTIFICATE", startX + acteWidth, startActe);

    const num = "N° : ";
    const numeroWidth = doc.getTextWidth(num);
    const docNumberWidth = doc.getTextWidth(id);
    const center = ((doc.internal.pageSize.width / 2) - (docNumberWidth + numeroWidth) / 2);

    // Définir la police en gras
    doc.setFont(myFont, fontStyles.Bold);
    doc.setFontSize(fontSizes.Head2TitleFontSize);

    doc.text(num, center, startActe + interline * 1.9);
    doc.setFont(myFont2, fontStyles.Normal);
    doc.text(id, numeroWidth + center, startActe + interline *1.9);  
    setLineToText(numeroWidth, docNumberWidth, interline *1.91);  

    //Child
    setText2("Nom de l'enfant :  ", "Surname of the child  ", data.surname, 3);
    setText2("Prénoms de l'enfant :  ", "Given name of the child  ", data.givenName, 4.2);
    setText1("Né le - ", "Born on the", data.dateBirth, 5.4);
    setText1("A - ", "At ", data.placeBirth, 6.4);
    setText1("De sexe - ", "Sex", data.gender, 7.3);
    // Father
    setText1("De - ", "Of", data.fatherName, 8);
    setText1("Le - ", "Born at", data.fatherBornAt, 9);
    setText1("Ne a  - ", "On the", data.fatherBornOn, 10);
    setText1("Domicilié - ", "Resident at", data.fatherResidence, 11);
    setText1("Profession - ", "Occupation", data.fatherOccupation, 12);
    setText1("Nationalité - ", "Nationality", data.fatherNationality, 13);
    setText1("Document de référence -  ", "  Reference document ", data.fatherDocument, 14);

    // Mother
    setText1("Et de - ", "And of", data.motherName, 15);
    setText1("Née a - ", "Born at", data.motherBornAt, 16);
    setText1("Le  - ", "On the", data.motherBornOn, 17);
    setText1("Domiciliée - ", "Resident at", data.motherResidence, 18);
    setText1("Profession - ", "Occupation", data.fatherOccupation, 19);
    setText1("Nationalité - ", "Nationality", data.motherNationality, 20);
    setText1("Document de référence -  ", "  Reference document ", data.motherDocument, 21);

    //Dresse le 
    setText1("Dressé le  - ", "Drawn up on the", data.registrationDate, 22);

    //Declarer    
    setText1("Sur la déclaration de -  ", " In accordance with the declaration of   ", "", 23);
    setText1("", "", data.declarer, 24);

    //Certification
    const certifyLabel = "Lesquels ont certifié la sincérité de la présente déclaration, ";
    const certifyLabelEng = "Who attested to the truth of this declaration ";
    setText2(certifyLabel, certifyLabelEng, "", 25);

    //Officer 
    setText1("Par Nous, ", "By Us ", data.officer, 26.3);

    //OfficerEnd 
    const officer3Label = "Officier";
    setTextEnd(officer3Label, 26.3);   


    //Officer Etat civil
    setText("d'état-civil - ", "Civil Status Registrar ", "", 27);

    //Secretary Etat civil
    setText1("Assisté de - ", "In the presence of ", data.secretary, 27.7);

    //OfficerEnd     
    const secretary3Label = "Secrétaire";
    setTextEnd(secretary3Label, 27.7);   

    //Secretary2 Etat civil
    setText("d'état-civil - ", "Secretary", "", 28.4);

    //setText1("Le  - ", "On the", data.motherBornAt, 30.3);
    setTextCenter("Le - ", " On the ", data.registrationDate, 29.4)

    setTextCenter2Start("Le Secretaire d'etat civil", "Secretary", 30.4, fontStyles.Normal);
    setTextCenter2End("Signature de l'Officer d'etat civil", "Signature of Civil Staus Registrar", 30.4, fontStyles.Normal);
//const url="http://google.com";

 // Générer le QR code
 QRCode.toDataURL(id, (err, url) => {
  if (err) {
    reject(err);
    return;
  }

  // Ajouter l'image QR code au PDF
  doc.addImage(url, 'PNG', 10, 10, 50, 50);


    // Sauvegarder le PDF
    doc.save(filename);
  resolve(doc);
});
});
};
  //module.exports = generatePDF;

  export default generatePDF;