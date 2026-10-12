tFPDF 1.34 (FPDF with UTF-8 text and font subsetting)
by Ian Back and Tycho Veltmeijer, based on FPDF by Olivier Plathey.
Source: https://github.com/Setasign/tFPDF (unchanged copy of tfpdf.php and font/unifont/ttfonts.php).
License: GNU LGPL 2.1, see LICENSE-LGPL-2.1.txt.

Used by OM_Insights_Pdf to build the downloadable Insights report. That class reads the
fonts in ../fonts each time and never lets tFPDF write font caches into the plugin folder.
