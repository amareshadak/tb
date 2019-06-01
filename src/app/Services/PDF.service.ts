declare let jsPDF: any;
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PDFService {

  constructor() { }

  exportHtmlToPdf(pdfname: string, htmlid: string) {
    const doc = new jsPDF();
    doc.autoTable({ html: htmlid });
    doc.save(pdfname);
  }

  exportJsonToPdf(json: string){
    var item = {
      "Name" : "XYZ",
      "Age" : "22",
      "Gender" : "Male"
    };
    var doc = new jsPDF();
    var col = ["Details", "Values"];
    var rows = [];

    for(var key in item){
        var temp = [key, item[key]];
        rows.push(temp);
    }

    doc.autoTable(col, rows);

    doc.save('Test.pdf');
  }
}
