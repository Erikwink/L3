import Swal from 'sweetalert2'
/* eslint-disable */

export class AlertManager {

  showError (errorMessage) {
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: errorMessage,
      footer: 'Please try again'
    })
  }

  showNoDataToClear () {
    Swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: 'There is no data to clear!'
    })
  }

   /**
   * Wait for user to confirm clearing data.
   * @returns {Promise<boolean>} - Resolves to true if user confirms, false otherwise.
   */
   async showConfirmClearData() {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover the data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'No, keep it',
      allowOutsideClick: () => !Swal.isLoading()
    });

    if (result.isConfirmed) {
      await Swal.fire('Cleared!', 'Your data has been cleared.', 'success');
      return true;
    }

    return false;
  }
}
