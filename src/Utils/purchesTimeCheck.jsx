/* eslint-disable no-unused-vars */
import Cookies from "universal-cookie";

export const packageCheck = async (option, id) => {
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const userRole = cookies.get("role");

  console.log(option, id);

  const userInfo = await fetch(
    `https://matrimoni-ashik-rahman100.vercel.app/api/v1/user/getuser/${userEmail}`
  );
  const user = await userInfo.json();

  let purchesPackage = user?.message?.purchesPackage;

  let { status, purchaseLastTime, condition, profileVisted } = purchesPackage;

  if (userRole === "admin" || userRole === "super_admin") {
    console.log("admin True");
    return true;
  } else {
    console.log("admin false");

    let timeNow = Date.now();
    if (
      timeNow > purchaseLastTime ||
      status === "pending" ||
      purchaseLastTime === undefined
    ) {
      return false;
    }

    let purchesPackage;

    if (option === "profile") {
      let profileViewChcek = condition.find(
        (cond) => cond.option === "Visit Profiles"
      );
      if (profileViewChcek.value < 1) {
        return false;
      }

      let matchProfile = profileVisted.find((profileId) => profileId === id);

      if (matchProfile !== undefined) {
        return true;
      }

      profileVisted.push(id);

      let newValue = profileViewChcek.value - 1;

      profileViewChcek.value = newValue;

      let remainCondition = condition.filter(
        (cond) => cond.option !== "Visit Profiles"
      );

      let newConditon = [profileViewChcek, ...remainCondition];

      purchesPackage = {
        ...user?.message?.purchesPackage,
        profileVisted,
        condition: newConditon,
      };
    } else if (option === "message") {
      console.log("object");
      let proposalSendChcek = condition.find(
        (cond) => cond.option === "Send Proposal Message."
      );
      if (proposalSendChcek.value < 1) {
        return false;
      }

      let newValue = proposalSendChcek.value - 1;

      proposalSendChcek.value = newValue;

      let remainCondition = condition.filter(
        (cond) => cond.option !== "Send Proposal Message."
      );

      let newConditon = [proposalSendChcek, ...remainCondition];

      purchesPackage = {
        ...user?.message?.purchesPackage,
        condition: newConditon,
      };
    }

    console.log(purchesPackage);

    fetch(
      `https://matrimoni-ashik-rahman100.vercel.app/api/v1/user/profile/update/${userEmail}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ purchesPackage }),
      }
    ).then((res) => res.json());

    return true;
  }
};

export const profileViewCheck = async (id) => {
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const userRole = cookies.get("role");

  const userInfo = await fetch(
    `https://matrimoni-ashik-rahman100.vercel.app/api/v1/user/getuser/${userEmail}`
  );

  const user = await userInfo.json();

  let purchesPackage = user?.message?.purchesPackage;

  let { status, purchaseLastTime, condition, profileVisted } = purchesPackage;

  // let purchaseStatus = user?.message?.purchesPackage?.status;
  // let purchaseTime = user?.message?.purchesPackage?.purchaseLastTime;
  // let packageCondition = user?.message?.purchesPackage?.condition;

  if (userRole === "admin" || userRole === "super_admin") {
    return true;
  } else {
    if (status === "pending" || purchaseLastTime === undefined) {
      return false;
    }

    let timeNow = Date.now();

    if (timeNow > purchaseLastTime) {
      return false;
    }

    let profileViewChcek = condition.find(
      (cond) => cond.option === "Visit Profiles"
    );
    if (profileViewChcek.value < 1) {
      return false;
    }

    let matchProfile = profileVisted.find((profileId) => profileId === id);

    if (matchProfile !== undefined) {
      return true;
    }

    profileVisted.push(id);

    let newValue = profileViewChcek.value - 1;

    profileViewChcek.value = newValue;

    let remainCondition = condition.filter(
      (cond) => cond.option !== "Visit Profiles"
    );

    let newConditon = [profileViewChcek, ...remainCondition];

    let purchesPackage = {
      ...user?.message?.purchesPackage,
      profileVisted,
      condition: newConditon,
    };

    console.log(purchesPackage);

    fetch(
      `https://matrimoni-ashik-rahman100.vercel.app/api/v1/user/profile/update/${userEmail}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ purchesPackage }),
      }
    ).then((res) => res.json());
    // .then((data) => {
    // console.log(data);
    // });

    return true;
  }
};

export const proposalSendCheck = async () => {
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const userRole = cookies.get("role");

  const userInfo = await fetch(
    `https://matrimoni-ashik-rahman100.vercel.app/api/v1/user/getuser/${userEmail}`
  );

  const user = await userInfo.json();

  // let purchesPackage = user?.message?.purchesPackage;

  // let {status, purchaseLastTime, condition, profileVisted } = purchesPackage;

  let purchaseStatus = user?.message?.purchesPackage?.status;
  let purchaseTime = user?.message?.purchesPackage?.purchaseLastTime;
  let proposalCondition = user?.message?.purchesPackage?.condition;

  // console.log(purchaseStatus);

  if (userRole === "admin" || userRole === "super_admin") {
    return true;
  } else {
    if (purchaseStatus === "pending" || purchaseTime === undefined) {
      return false;
    }

    let timeNow = Date.now();

    if (timeNow > purchaseTime) {
      return false;
    }
    let proposalSendChcek = proposalCondition.find(
      (cond) => cond.option === "Send Proposal Message."
    );
    if (proposalSendChcek.value < 1) {
      return false;
    }

    let newValue = proposalSendChcek.value - 1;

    proposalSendChcek.value = newValue;

    let remainCondition = proposalCondition.filter(
      (cond) => cond.option !== "Send Proposal Message."
    );

    let newConditon = [proposalSendChcek, ...remainCondition];

    let purchesPackage = {
      ...user?.message?.purchesPackage,
      condition: newConditon,
    };

    // fetch(
    //   `https://matrimoni-ashik-rahman100.vercel.app/api/v1/user/profile/update/${userEmail}`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ purchesPackage }),
    //   }
    // ).then((res) => res.json());
    // .then((data) => {
    // console.log(data);
    // });

    return true;
  }
};
