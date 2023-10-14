import { mount } from '@vue/test-utils';
import AddEmployee from '@/components/Pages/AddEmployee.vue';

describe('AddEmployee.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(AddEmployee);
    expect(wrapper.exists()).toBe(true);
  });

  // Add more test cases based on your component's behavior
});
