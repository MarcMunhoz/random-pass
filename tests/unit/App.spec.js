import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("Foo", () => {
  it("renders a div", () => {
    const wrapper = shallowMount(App);
    expect(wrapper.contains("div#app")).toBe(true);
  });
});
