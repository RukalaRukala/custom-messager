import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const blockLogGuard: CanActivateFn = () => {
  if (!localStorage['isAuth']) {
    return true;
  } else {
    inject(Router).navigate(['/chat']);
    return false;
  }
};
