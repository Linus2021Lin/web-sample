import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataToolsService {

  constructor() { }

  generateCsvFile(sourceData: Array<any>, nameString?: string) {
    if (!sourceData || !sourceData.length) {
      return;
    }

    const fileName = nameString || 'File';
    const separator = ',';
    const dataKeys = Object.keys(sourceData[0]);
    const link = document.createElement('a');
    const sourceMapString = sourceData.map(data => {
                              return dataKeys.map(key => {
                                let cell = data[key] === null || data[key] === undefined ? '' : data[key];

                                cell = cell instanceof Date
                                  ? cell.toLocaleString()
                                  : cell.toString().replace(/"/g, '""');

                                if (cell.search(/("|,|\n)/g) >= 0) {
                                  cell = `"${cell}"`;
                                }

                                return cell;
                              }).join(separator);
                            }).join('\n');
    const csvContent = dataKeys.join(separator) + '\n' + sourceMapString;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });

    // Browsers that support HTML5 download attribute
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
