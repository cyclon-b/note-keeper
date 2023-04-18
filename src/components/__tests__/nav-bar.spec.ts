import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import NavBar from '@/components/ui/NavBar.vue';

describe('Navbar', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(NavBar);
    expect(wrapper.exists()).toBe(true);
  });

  it('toggles mobile navigation when button is clicked', () => {
    const wrapper = shallowMount(NavBar);
    const button = wrapper.find('.navbar-burger');
    button.trigger('click');
    expect(wrapper.vm.showMobileNav).toBe(true);
    button.trigger('click');
    expect(wrapper.vm.showMobileNav).toBe(false);
  });
});
