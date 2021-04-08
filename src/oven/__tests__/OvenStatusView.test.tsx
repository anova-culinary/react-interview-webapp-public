import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { OvenStatusView } from "../OvenStatusView";
import React from "react";
import {
  OvenStateContext,
  OvenStateDispatchContext
} from "../../context/OvenStateContext";
import buildInitialOvenState from "../../models/buildInitialOvenState";

// we need to run this at the top of each enzyme test to get it working in codesandbox
configure({ adapter: new Adapter() });

describe("OvenStatusView", () => {
  const defaultOvenState = buildInitialOvenState();

  const mockDispatch = jest.fn();
  const render = ({ state = defaultOvenState, dispatch = mockDispatch }) => {
    return mount(
        <OvenStateContext.Provider value={state}>
          <OvenStateDispatchContext.Provider value={dispatch}>
            <OvenStatusView />
          </OvenStateDispatchContext.Provider>
        </OvenStateContext.Provider>
    );
  };

  describe("oven status view", () => {
    describe("temperature and unit", () => {
      it("displays the oven temperature rounded to two decimal places", () => {
        const wrapper = render({ state: defaultOvenState });

        const temperatureDisplay = wrapper
            .find("[data-testid='temperatureDisplay']")
            .first()
            .text();

        expect(temperatureDisplay).toEqual(
            `${defaultOvenState.temperature.toFixed(2)}°${
                defaultOvenState.temperatureUnit
            }`
        );
      });
    });

    describe("steam percentage", () => {
      const findInput = (wrapper) => {
        return wrapper.find("[data-testid='steamPercentageInput']").first();
      };
      const findInputValue = (wrapper) => {
        return findInput(wrapper).instance().value;
      };
      const changeInputValue = (wrapper, newValue) => {
        findInput(wrapper).simulate("change", {
          target: {
            value: newValue
          }
        });

        wrapper.update();
      };

      describe("displaying the steam percentage", () => {
        it("displays the oven temperature rounded to two decimal places", () => {
          const wrapper = render({ state: defaultOvenState });

          const steamPercentage = findInputValue(wrapper);

          expect(steamPercentage).toEqual(
              defaultOvenState.steamPercentage.toString()
          );
        });
      });

      describe("updating the steam percentage", () => {
        it("updates the oven state with a new value", () => {
          const wrapper = render({ state: defaultOvenState });

          changeInputValue(wrapper, "100");

          const steamPercentage = findInputValue(wrapper);

          expect(steamPercentage).toEqual("100");

          expect(mockDispatch).toHaveBeenCalledTimes(1);
          expect(mockDispatch).toHaveBeenCalledWith({
            type: "setSteamPercentage",
            payload: {
              newSteamPercentage: 100
            }
          });
        });
      });
    });

    describe("sous vide mode", () => {
      describe("when sous vide mode is on", () => {
        it("shows 'On'", () => {
          const wrapper = render({ state: defaultOvenState });

          const sousVideModeDisplay = wrapper
              .find("[data-testid='sousVideModeDisplay']")
              .first()
              .text();

          expect(sousVideModeDisplay).toEqual("On");
        });
      });

      describe("when sous vide mode is off", () => {
        it("shows 'Off'", () => {
          const wrapper = render({
            state: {
              ...defaultOvenState,
              sousVideMode: false
            }
          });

          const sousVideModeDisplay = wrapper
              .find("[data-testid='sousVideModeDisplay']")
              .first()
              .text();

          expect(sousVideModeDisplay).toEqual("Off");
        });
      });
    });
  });
});
