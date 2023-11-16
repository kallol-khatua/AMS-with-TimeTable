import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import header from '../assets/header.png';
import footer from '../assets/footer.png';
import { CustomTh, CustomLink, CustomBlueButton } from '../styles/customStyles';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs=pdfFonts && pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : globalThis.pdfMake.vfs;


function downloadPDF(timetableData, summaryData, type, ttdata, updatedTime, headTitle,notes) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
// console.log('type',type)
// console.log('ttdataaaa',timetableData)
// console.log('passed time',updatedTime)
// console.log('title',headTitle)

const session = ttdata[0].session;
  const dept = ttdata[0].dept;
  const updatedTime1 =updatedTime;
  const headTitle1 =headTitle;
  const printNotes=notes;

  const tableData = [];
  let subheading = '';

  if (type == 'sem') {
    subheading = 'Degree & Sem:';
  } else if (type =='faculty') {
    subheading = 'Faculty Name: Dr.';
  }
  else if (type =='room') {
    subheading = 'Room: ';
  }
  const subheading1=subheading;
// console.log(subheading)
  const tableHeader = [
    'Day/Period',
    '8:30 AM - 9:25 AM',
    '9:30 AM - 10:25 AM',
    '10:30 AM - 11:25 AM',
    '11:30 AM - 12:25 PM',
    '12:30 PM - 1:30 PM',
    '1:30 PM - 2:25 PM',
    '2:30 PM - 3:25 PM',
    '3:30 PM - 4:25 PM',
    '4:30 PM - 5:25 PM',
  ];

  tableData.push(tableHeader);

  days.forEach((day) => {
    const row = [day];

    for (let period = 1; period <= 9; period++) {
      let cellContents = [];
      let cellData;

      if (period === 5) {
        row.push({
          text: 'Lunch',
          alignment: 'center',
        });
        continue;
      } else if (period < 5) {
        cellData = timetableData[day][`period${period}`];
      } else {
        cellData = timetableData[day][`period${period - 1}`];
      }

      cellData.forEach((slot) => {
        slot.forEach((cell) => {
          cellContents.push({
            text: cell.subject,
            fontSize: 12,
          });
        });
      });

      row.push({
        stack: cellContents,
        alignment: 'center',
      });
    }

    tableData.push(row);
  });

  const summaryTableData = [];
  const summaryTableHeader = [
    { text: 'Abbreviation', bold: true, alignment: 'center', fontSize: 10 },
    { text: 'Subject Code', bold: true, fontSize: 10 },
    { text: 'Subject Name', bold: true, fontSize: 10 },
    { text: 'Hours', bold: true, alignment: 'center', fontSize: 10 },
  ];

  // if (type !== 'room') {
    summaryTableHeader.push({ text: 'Subject Type', bold: true, fontSize: 10 });
  // }

  if (type !== 'faculty') {
    summaryTableHeader.push({ text: 'Faculty Name', bold: true, fontSize: 10 });
  }

  if (type !== 'room') {
    summaryTableHeader.push({ text: 'Room No', bold: true, fontSize: 10 });
  }

  if (type !== 'sem') {
    summaryTableHeader.push({ text: 'Semester', bold: true, fontSize: 10 });
  }

  summaryTableData.push(summaryTableHeader);

  Object.keys(summaryData).forEach((subject) => {
    const summaryRow = [];
    summaryRow.push({ text: summaryData[subject].originalKeys.join(', '), fontSize: 10, alignment: 'center' });
    summaryRow.push({ text: summaryData[subject].subCode, fontSize: 10, alignment: 'center' });
    summaryRow.push({ text: summaryData[subject].subjectFullName, fontSize: 10 });
    summaryRow.push({ text: summaryData[subject].count, fontSize: 10, alignment: 'center' });
    summaryRow.push({ text: summaryData[subject].subType, fontSize: 10, alignment: 'center' });

    if (type !== 'faculty') {
      summaryRow.push({ text: summaryData[subject].faculties.join(', '), fontSize: 10 });
    }

    if (type !== 'room') {
      summaryRow.push({ text: summaryData[subject].rooms.join(', '), fontSize: 10 });
    }

    if (type !== 'sem') {
      summaryRow.push({ text: summaryData[subject].subSem, fontSize: 10 });
    }

    summaryTableData.push(summaryRow);
  });

  const headerImage = new Image();
  headerImage.src = header;

  headerImage.onload = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = headerImage.width;
    canvas.height = headerImage.height;
    context.drawImage(headerImage, 0, 0);
    const headerImageDataURL = canvas.toDataURL('image/png');

    const footerImage = new Image();
    footerImage.src = footer;

    footerImage.onload = () => {
      const footerCanvas = document.createElement('canvas');
      const footerContext = footerCanvas.getContext('2d');
      footerCanvas.width = footerImage.width;
      footerCanvas.height = footerImage.height;
      footerContext.drawImage(footerImage, 0, 0);
      const footerImageDataURL = footerCanvas.toDataURL('image/png');

      const documentDefinition = {
        pageOrientation: 'landscape',
        header: {
          image: headerImageDataURL,
          width: 450,
          alignment: 'center',
        },
        footer: {
          image: footerImageDataURL,
          width: 400,
          alignment: 'center',
        },
        content: [
          {
            text: `Department of ${dept}`,
            fontSize: 12,
            bold: true,
            margin: [15, 15, 40, 10],
            alignment: 'center',
          },
          {
            columns: [
              {
                text: `${subheading1}${headTitle1}`,
                fontSize: 12,
                bold: true,
                alignment: 'left',
              },
              {
                text: `Session: ${session}`,
                fontSize: 12,
                bold: true,
                alignment: 'center',
              },
              {
                text: `Last Locked on: ${updatedTime1}`,
                fontSize: 12,
                bold: true,
                alignment: 'right',
              },
            ],
            margin: [0, 0, 0, 10], // Add top margin if needed
          },
          
           
          {
            table: {
              body: tableData,
              alignment: 'center',
            },
          },
          {
            text: 'Summary:',
            fontSize: 12,
            bold: true,
            margin: [0, 10, 40, 10],
            alignment: 'left',
          },
          {
            table: {
              fontSize: 10,
              body: summaryTableData,
              alignment: 'center',
            },
          },
          ...(notes && notes.length > 0
            ? [
                {
                  text: 'Notes:',
                  fontSize: 10,
                  bold: true,
                  margin: [0, 2, 0, 2], // top, right, bottom, left
                },
                {
                  ul: notes.map(noteArray => noteArray.map(note => ({ text: note, fontSize:10 }))),
                },
              ]
            : []),




          {
            columns: [
              {
                text: 'Time Table Incharge',
                fontSize: 12,
                bold: true,
                alignment: 'left',
              },
              {
                text: 'Head of the Department',
                fontSize: 12,
                bold: true,
                alignment: 'right',
              },
            ],
            margin: [0, 20, 0, 0],
          },
            // layout: 'noBorders',
            // margin: [0, 30, 0, 0],
        ],
      };

      pdfMake.createPdf(documentDefinition).download(`${headTitle}_timetable.pdf`);
    };
  };
}

export default downloadPDF;