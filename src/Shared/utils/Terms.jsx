import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

export const callAlert = () =>
  swalWithBootstrapButtons
    .fire({
      title: "Do You Agree?",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type an",
      icon: "info",
      // showCancelButton: true,
      confirmButtonText: "Agreed",

      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire("Agreed!", "You can Proceed.", "success");
      }
    });
