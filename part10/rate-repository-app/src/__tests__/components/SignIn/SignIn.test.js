import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native'
import { SignInContainer } from '../../../components/SignIn'

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn()
      render(<SignInContainer onSubmit={onSubmit} />)

      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle')
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password')
      fireEvent.press(screen.getByText('sign In'))

      //screen.debug()
      //https://github.com/jaredpalmer/formik/issues/1543
      //https://stackoverflow.com/questions/68732441/warning-an-update-to-formik-inside-a-test-was-not-wrapped-in-act
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)

        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        })
      })
    })
  })
})
