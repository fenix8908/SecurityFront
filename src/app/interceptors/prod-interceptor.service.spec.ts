/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProdInterceptorService } from './prod-interceptor.service';

describe('Service: ProdInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProdInterceptorService]
    });
  });

  it('should ...', inject([ProdInterceptorService], (service: ProdInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
