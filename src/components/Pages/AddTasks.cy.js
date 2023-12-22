import AddTasks from './AddTasks.vue'

describe('<AddTasks />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AddTasks)
  })
})