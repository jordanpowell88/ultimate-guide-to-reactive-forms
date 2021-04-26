import { Pipe, PipeTransform } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

@Pipe({
  name: "errorMessages"
})
export class ErrorMessagesPipe implements PipeTransform {
  transform(errors: ValidationErrors): string[] {
    if (!errors) {
      return;
    }
    return Object.keys(errors);
  }
}
