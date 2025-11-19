exports.setMailOptions = (status, name, booking = null) => {
  let subject, html;

  switch (status) {
    case "Created":
      subject = "Booking Completed Successfully – Awaiting Confirmation";
      html = `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h3>Hotel Booking</h3>
        <p>Hello ${name},</p>
        <p>Your booking has been created successfully.</p>
        <p>Thank you for choosing our hotel!</p>
      </div>`;
      break;

    case "UpdateData":
      subject = "Update Booking Data";
      html = `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h3>Hotel Booking</h3>
        <p>Hello ${name},</p>
        <p>Your booking has been <strong>Updated</strong>.</p>
        <p>Your data after update:</p>
        <p>CheckIn: ${booking?.checkIn}</p>
        <p>CheckOut: ${booking?.checkOut}</p>
      </div>`;
      break;

    case "Pending":
      subject = "Booking Pending Confirmation";
      html = `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h3>Hotel Booking</h3>
        <p>Hello ${name},</p>
        <p>Your booking request has been received and is <strong>pending confirmation</strong>.</p>
        <p>We will notify you once it is confirmed.</p>
      </div>`;
      break;

    case "Confirmed":
      subject = "Booking Confirmed";
      html = `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h3>Hotel Booking</h3>
        <p>Hello ${name},</p>
        <p>Your booking has been <strong>confirmed</strong>.</p>
        <p>We look forward to welcoming you!</p>
      </div>`;
      break;

    case "Cancelled":
      subject = "Booking Cancelled";
      html = `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h3>Hotel Booking</h3>
        <p>Hello ${name},</p>
        <p>Your booking has been <strong>cancelled</strong>.</p>
        <p>If you have any questions, please contact support.</p>
      </div>`;
      break;

    case "CheckedIn":
      subject = "Checked In Successfully";
      html = `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h3>Hotel Booking</h3>
        <p>Hello ${name},</p>
        <p>You have been <strong>checked in</strong> successfully.</p>
        <p>Enjoy your stay!</p>
      </div>`;
      break;

    case "CheckedOut":
      subject = "Checked Out Successfully";
      html = `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h3>Hotel Booking</h3>
        <p>Hello ${name},</p>
        <p>You have been <strong>checked out</strong> successfully.</p>
        <p>We hope you enjoyed your stay. Looking forward to seeing you again!</p>
      </div>`;
      break;

    default:
      subject = "Booking Update";
      html = `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h3>Hotel Booking</h3>
        <p>Hello ${name},</p>
        <p>Your booking status has been updated to <strong>${status}</strong>.</p>
      </div>`;
  }

  return { subject, html };
};