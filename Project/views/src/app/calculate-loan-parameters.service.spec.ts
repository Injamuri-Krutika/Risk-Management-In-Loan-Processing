import { TestBed } from "@angular/core/testing";

import { CalculateLoanParametersService } from "./calculate-loan-parameters.service";

describe("CalculateLoanParametersService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CalculateLoanParametersService = TestBed.get(
      CalculateLoanParametersService
    );
    expect(service).toBeTruthy();
  });
});
