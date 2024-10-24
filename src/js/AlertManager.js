import Swal from 'sweetalert2'

/**
 * Encapsulates alert functionality because its from 3 part library.
 */
export class AlertManager {
  /**
   *
   */
  constructor () {}

  /**
   *
   * @param errorMessage
   */
  Error (errorMessage) {
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: errorMessage,
      footer: 'Please try again'
    })
  }

  /**
   *
   */
  NoDataToClear () {
    Swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: 'There is no data to clear!'
    })
  }

  /**
   *
   */
  clearDataOptions () {
    return Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover the data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'No, keep it',
      preConfirm: () => {
        return new Promise((resolve) => {
          Swal.fire(
            'Cleared!',
            'Your data has been cleared.',
            'success'
          ).then(() => {
            resolve(true)
          })
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        return false
      }
      return result.value
    })
  }
}
