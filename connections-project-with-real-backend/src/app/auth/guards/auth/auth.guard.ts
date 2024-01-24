import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  if (localStorage['isAuth']) {
    return true;
  } else {
    inject(Router).navigate(['/signin']);
    return false;
  }
};
