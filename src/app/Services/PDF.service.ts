declare var jsPDF: any;
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PDFService {

constructor() { }
exportHtmlToPdf(pdfname: string, htmlid: string ) {
  const doc = new jsPDF();
  doc.autoTable({html: htmlid});
  doc.save(pdfname);
}

}
