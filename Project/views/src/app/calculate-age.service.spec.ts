import { TestBed } from "@angular/core/testing";

import { CalculateAgeService } from "./calculate-age.service";

describe("CalculateAgeService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CalculateAgeService = TestBed.get(CalculateAgeService);
    expect(service).toBeTruthy();
  });
});
