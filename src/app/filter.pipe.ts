import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args || !args.trim()) return value; // Vérification si args est défini et non vide
    
    args = args.toLowerCase();
    return value.filter(function(reclamation: any) {
      return JSON.stringify(reclamation).toLowerCase().includes(args);
    });
  }

}
