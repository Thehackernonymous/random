import AddEmployee from './AddEmployee.vue'

describe('<AddEmployee />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AddEmployee)
  })
})