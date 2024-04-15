const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const sendMail = require("../utils/sendMail.js");
const ExpressError = require("../utils/ExpressError.js");
const {
  PENDING_MAIL_TEMPLATE_ADMIN,
  PENDING_MAIL_TEMPLATE_USER,
  APPROVED_MAIL_TEMPLATE,
  REJECTED_MAIL_TEMPLATE,
} = require("../../constants.js");

const approveRequestController = async (req, res, next) => {
  const { id } = req.body;
  const request = await prisma.requests.findUnique({
    where: {
      id: id,
    },
  });
  if (!request) {
    throw new ExpressError("Request not found", 404);
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email: request.email,
    },
  });

  if(userExists && userExists.status === "INACTIVE"){
    const restoredUser = await prisma.user.update({
      where: {
        email: request.email,
      },
      data: {
        name: request.name,
        email: request.email,
        role: request.role,
        status: "ACTIVE",
      },
    });
    if (!restoredUser) {
      throw new ExpressError("Error in restoring user", 500);
    }
  }
  if(!userExists){
    const newUser = await prisma.user.create({
      data: {
        name: request.name,
        email: request.email,
        role: request.role,
      },
    });
    if (!newUser) {
      throw new ExpressError("Error in creating new user", 500);
    }  
  }


  const approvedRequest = await prisma.requests.delete({
    where: {
      id: id,
    },
  });
  if (!approvedRequest) {
    throw new ExpressError("Request not found", 404);
  }
  const mailTemplate = APPROVED_MAIL_TEMPLATE(request.role);
  const mailOptions = {
    from: "dep2024.p06@gmail.com",
    to: request.email,
    subject: "Mediease - Request Approved",
    html: mailTemplate,
    text: "",
  };

  const info = await sendMail(mailOptions);
  if (!info) {
    throw new ExpressError("Error in sending approval mail to user", 500);
  }

  return res.status(200).json({
    ok: true,
    data: [],
    message: "Request approved successfully",
  });
};

const rejectRequestController = async (req, res, next) => {
  const { id } = req.body;
  const request = await prisma.requests.findUnique({
    where: {
      id: id,
    },
  });
  if (!request) {
    throw new ExpressError("Request not found", 404);
  }

  const rejectedRequest = await prisma.requests.delete({
    where: {
      id: id,
    },
  });
  if (!rejectedRequest) {
    throw new ExpressError("Request not found", 404);
  }
  const mailTemplate = REJECTED_MAIL_TEMPLATE(request.role);
  const mailOptions = {
    from: "dep2024.p06@gmail.com",
    to: request.email,
    subject: "Mediease - Request Declined",
    html: mailTemplate,
    text: "",
  };

  const info = await sendMail(mailOptions);
  if (!info) {
    throw new ExpressError("Error in sending rejection mail to user", 500);
  }

  return res.status(200).json({
    ok: true,
    data: [],
    message: "Request rejected successfully",
  });
};

const pendingRequestController = async (req, res, next) => {
  const { name, email, role } = req.body;
  const request = await prisma.requests.create({
    data: {
      name,
      email,
      role,
    },
  });
  if (!request) {
    throw new ExpressError("Error in creating request", 500);
  }
  const admins = await prisma.user.findMany({
    where: {
      role: "ADMIN",
    },
  });
  const mailTemplateUser = PENDING_MAIL_TEMPLATE_USER();
  const mailTemplateAdmin = PENDING_MAIL_TEMPLATE_ADMIN(
    request.email,
    request.name,
    request.role
  );
  for (let i = 0; i < admins.length; i++) {
    adminEmail = admins[i].email;

    const mailOptionsAdmin = {
      from: "dep2024.p06@gmail.com",
      to: adminEmail,
      subject: "Mediease - Pending Request Approval",
      html: mailTemplateAdmin,
      text: "",
    };
    const infoAdmin = await sendMail(mailOptionsAdmin);
    if (!infoAdmin) {
      throw new ExpressError("Error in sending pending mail to admin", 500);
    }
  }

  const mailOptionsUser = {
    from: "dep2024.p06@gmail.com",
    to: request.email,
    subject: "Mediease - Role Approval Pending",
    html: mailTemplateUser,
    text: "",
  };

  const infoUser = await sendMail(mailOptionsUser);
  if (!infoUser) {
    throw new ExpressError("Error in sending pending mail to user", 500);
  }

  return res.status(200).json({
    ok: true,
    data: [],
    message: "Approval Pending mail sent to user successfully.",
  });
};

module.exports = {
  approveRequestController,
  rejectRequestController,
  pendingRequestController,
};
