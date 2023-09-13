import { GoogleMapPage } from "../page/googleMapPage";

describe("RamSoft Google Maps Directions", () => {
  const googleMapPage = new GoogleMapPage();
  beforeEach(() => {
    cy.visit("/");
  });

  it('requesting directions from Toronto to Ottawa has different travel modes available', () => {
    const travelModes = ['Driving', 'Transit', 'Walking', 'Cycling', 'Flights'];
    googleMapPage.clickDirectionButton()
      .inputStartingPoint('Toronto, ON')
      .inputDestinationPoint('Ottawa, ON')
      .verifyTravelModesAvailable(travelModes);
  })

  it("driving from Toronto to Ottawa has multiple routes to choose from, and each route has a time and distance displayed", () => {
    const travelMode = 'Driving'
    googleMapPage.clickDirectionButton()
      .inputStartingPoint('Toronto, ON')
      .inputDestinationPoint('Ottawa, ON')
      .chooseTravelMode(travelMode)
      .verifyTheTravelModesAreDisplayedInResultList(travelMode)
      .verifyDistancesAreDisplayedCorrectly(['450 km', '403 km'])
      .verifyTimeToArrivalIsEstimatedCorrectly(travelMode);
  });

  it("can change the route recommendations based on the time they want to arrive at the destination", () => {
    const travelMode = 'Driving'
    googleMapPage.clickDirectionButton()
      .inputStartingPoint('Toronto, ON')
      .inputDestinationPoint('Ottawa, ON')
      .chooseTravelMode(travelMode)
      .verifyTheTravelModesAreDisplayedInResultList(travelMode)
      .chooseDirectionInTheResultListByIndex(1)
      .verifyDirectionTripInformation('Hwy 7/Trans-Canada Hwy');
  });

});
