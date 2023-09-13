export class GoogleMapPage {
    clickDirectionButton() {
        cy.get('button[aria-label="Directions"]')
            .should('be.visible')
            .click();
        return this;
    }
    inputStartingPoint(startingPoint) {
        cy.get('.widget-directions').should('be.visible');
        cy.get('.tactile-searchbox-input')
            .first()
            .type(startingPoint);
        return this;
    }

    inputDestinationPoint(destinationPoint) {
        cy.get('.tactile-searchbox-input')
            .last()
            .type(`${destinationPoint}{enter}`);
        return this;
    }

    verifyTravelModesAvailable(travelModes) {
        const items = []
        cy.get('div[role="radiogroup"] button img').each(($li) => items.push($li.attr('aria-label'))).then(() => {
            travelModes.forEach((travelMode) => {
                expect(items).to.include(travelMode);
            });
        });
        return this;
    }

    chooseTravelMode(travelMode) {
        cy.get('div[role="radiogroup"] button img').each(($li) =>
            $li.attr("aria-label") === travelMode ? cy.wrap($li).click() : null
        );
        return this;
    }

    verifyTheTravelModesAreDisplayedInResultList(travelMode) {
        cy.get('[id^=section-directions-trip-travel-mode]').each(($li) =>
            expect($li.attr("aria-label")).to.equal(travelMode));
        return this;
    }

    verifyDistancesAreDisplayedCorrectly(distances) {
        const items = []
        cy.get('div[id^=section-directions-trip]').each(($li) => {
            cy.wrap($li).find('div.fontBodyMedium div')
                .then($el => items.push($el.text()))
        }).then(() => {
            distances.forEach((distance) => {
                expect(items).to.include(distance);
            });
        });
        return this;
    }

    verifyTimeToArrivalIsEstimatedCorrectly(travelMode) {
        cy.get(`img[aria-label="${travelMode}"] + div`).then(($li) => {
            const estimateArriveTime = $li.text();
            cy.get('div[id^=section-directions-trip]').eq(0).find('div.delay-light').should('contain', estimateArriveTime);
        })
        return this;
    }

    chooseDirectionInTheResultListByIndex(index) {
        cy.get('div[id^=section-directions-trip]').eq(index).click();
        return this;
    }

    verifyDirectionTripInformation(title, isToll = true) {
        cy.get('div[id^=section-directions-trip]').eq(1).find('[id^=section-directions-trip-title]').should('contain', title);
        if (isToll) {
            cy.get('div[id^=section-directions-trip]').eq(1).find('.fontBodyMedium h6').should('contain', 'This route has tolls.');
        } else {
            cy.get('div[id^=section-directions-trip]').eq(1).find('.fontBodyMedium h6').should('not.be.visible');
        }
        return this;
    }
}