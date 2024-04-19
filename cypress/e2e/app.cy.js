import assert from 'assert'

class RegisterForm {
  elements = {
    titleInput: () => cy.get('#title'),
    titleFeedbackInput: () => cy.get('#titleFeedback'),
    imageUrlInput: () => cy.get('#imageUrl'),
    urlFeedbackInput: () => cy.get('#urlFeedback'),
    submitBtn: () => cy.get('#btnSubmit')
  }

  typeTitle(text) {
    if (!text) return
    this.elements.titleInput().type(text)
  }

  typeUrl(text) {
    if (!text) return
    this.elements.imageUrlInput().type(text)
  }

  clickSubmit() {
    this.elements.submitBtn().click()
  }
}

const registerForm = new RegisterForm()
const colors = {
  errors: 'rgb(220, 53, 69)',
  success: ''
}

describe('Image Registration', () => {
  describe('Submitting an image with invalid inputs', () => {

    after(() => {
      cy.clearAllLocalStorage()
    })

    const input = {
      title: '',
      url: ''
    }

    it('Given I am on the image registration page', () => {
      cy.visit('/')
    })

    it(`When I enter "${input.title}" in the title field`, () => {
      registerForm.typeTitle(input.title)
    })
    
    it(`Then I enter "${input.url}" in the URL field`, () => {
      registerForm.typeUrl(input.url)
    })

    it(`Then I click the submit button`, () => {
      registerForm.clickSubmit()
    })

    it(`Then I should see "Please type a title for the image" message above the title field`, () => {
      registerForm.elements.titleFeedbackInput().should('contains.text', 'Please type a title for the image')
    })

    it(`And I should see "Please type a valid URL" message above the imageUrl field`, () => {
      registerForm.elements.urlFeedbackInput().should('contains.text', 'Please type a valid URL')
    })

    it(`And I should see an exclamation icon in the title and URL fields`, () => {
      registerForm.elements.titleInput().should(([element]) => {
        const styles = window.getComputedStyle(element)
        const border = styles.getPropertyValue('border-right-color')
        assert.strictEqual(border, colors.errors)
      })
    })

  })

  describe('Submitting an image with valid inputs using enter key', () => {

    it('Given I am on the image registration page')
    it('When I enter "Alien BR" in the title field')
    it('Then I should see a check icon in the title field')
    it('When I enter "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg" in the URL field')
    it('Then I should see a check icon in the imageUrl field')
    it('Then I can hit enter to submit the form')
    it('And the list of registered images should be updated with the new item')
    it('And the new item should be stored in the localStorage')
    it('Then The inputs should be cleared')

  })
})