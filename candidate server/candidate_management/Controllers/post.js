const Candidate = require("../Models/candidates");

const validator = require("validator");

const paan = require("validate-india").pan;

//ADD CANDIDATE SINGULAR

const postAddCandidate = async (req, res, next) => {
  try {
    const candidate_name = req.body.candidate_name;

    const email = req.body.email;

    const contact = req.body.contact;

    const pan = req.body.pan;

    const role = req.body.role;

    const it_experience_years =
      req.body.it_experience_years;

    const status = req.body.status;

    console.log(req.body);

    const cz = await Candidate.addCandid.find();

    const validPhone = (phone) => {
      if (!NaN(phone)) {
        return true;
      } else {
        return false;
      }
    };
    if (parseFloat(it_experience_years) <= 0) {
      return res.status(408).json({
        message: "Please enter valid experience",
      });
    }

    if (!paan.isValid(pan)) {
      return res

        .status(403)

        .json({ message: "Please enter valid pan" });
    }

    if (!validator.isEmail(email)) {
      return res

        .status(406)

        .json({ message: "Please enter valid email" });
    }

    if (+contact.length !== 10) {
      return res.status(405).json({
        message: "Please enter valid  10 digit number",
      });
    }

    if (cz.find((cand) => cand.pan === pan)) {
      return res

        .status(500)

        .json({ message: "Candidate PAN already exists " });
    }

    if (cz.find((cand) => cand.email === email)) {
      return res.status(500).json({
        message: "Candidate email already exists",
      });
    }

    if (
      cz.find((cand) => cand.contact === parseInt(contact))
    ) {
      return res.status(500).json({
        message: "Candidate contact already exists",
      });
    } //counter

    Candidate.countermodel.findOneAndUpdate(
      { id: "val1" },

      { $inc: { seq: 1 } },

      { new: true },

      (err, cd) => {
        let seqId;

        if (cd == null) {
          const newval = new Candidate.countermodel({
            id: "val1",

            seq: 1,
          });

          newval.save();

          seqId = 1;
        } else {
          seqId = cd.seq;
        }

        const data = new Candidate.addCandid({
          id: "ZEN" + seqId,

          candidate_name: candidate_name,

          email: email,

          contact: contact,

          pan: pan,

          role: role,

          it_experience_years: it_experience_years,
        });

        data

          .save()

          .then((result) => {
            console.log("Data saved");

            console.log(contact);
          })

          .catch((err) => {
            console.log(err);

            return res.status(422).json({ err });
          });
      },
    );

    res.status(200).json({ Msg: "Data saved" });
  } catch (err) {
    console.log(err);
  }
};

//ADD CANDIDATE MULTIPLE

const postMultiple = async (req, res, next) => {
  try {
    let duplicate = "";

    var seqId = 0;

    const cz = await Candidate.addCandid.find();

    let flag = 0;

    let storeind = [];

    var info = req.body.data;

    console.log("Before file splice:", info);

    let arr = [];

    for (let i = 0; i < info.length; i++) {
      for (let j = i + 1; j < info.length; j++) {
        if (
          info[i].email == info[j].email ||
          info[i].contact == info[j].contact ||
          info[i].pan == info[j].pan
        ) {
          if (!arr.includes(info[i].candidate_name)) {
            arr.push(info[i].candidate_name);

            duplicate =
              info[i].candidate_name + " , " + duplicate;
          }

          info.splice(j, 1);

          j--;
        }
      }
    }

    console.log("After file splice:", info);

    info.map((candidate, index) => {
      //email, contact & PAN Validations

      if (
        cz.find(
          (cand) =>
            cand.email === candidate.email ||
            cand.contact === candidate.contact ||
            cand.pan === candidate.pan,
        )
      ) {
        storeind.push(index);

        if (!arr.includes(candidate.candidate_name))
          duplicate =
            candidate.candidate_name + " , " + duplicate;

        console.log("duplicate data :", index);

        console.log("name :", candidate.candidate_name);

        // flag = 1;

        // return res

        //   .status(500)

        //   .json(

        //     `${candidate.candidate_name}  having duplicate data`,

        //   );
      }
    });

    console.log(storeind);

    // if (flag != 1) {

    Candidate.countermodel.findOneAndUpdate(
      { id: "val1" },

      { $inc: { seq: req.body.data.length } },

      { new: true },

      (err, cd) => {
        // let seqId;

        if (cd == null) {
          const newval = new Candidate.countermodel({
            id: "val1",

            seq: req.body.data.length,
          });

          newval.save();

          seqId = 1;
        } else {
          seqId = cd.seq - req.body.data.length + 1;
        }

        let caninfo = req.body.data.map(
          (candidate, index) => {
            return {
              id: "ZEN" + (index + parseInt(seqId)),

              ...candidate,
            };
          },
        );
        console.log(caninfo);

        console.log("_______");

        for (let i = storeind.length - 1; i >= 0; i--) {
          // let temp=storeind[i];

          caninfo.splice(storeind[i], 1);
        }

        console.log("After splice caninfo :", caninfo);

        Candidate.addCandid.insertMany(
          caninfo,

          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log("succesfully done");

              if (duplicate == "")
                return res
                  .status(200)
                  .json("successfully submitted");
              else
                return res
                  .status(200)
                  .json(
                    `${duplicate} data is already existed, so they are skipped`,
                  );
            }
          },
        );
      },
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = { postAddCandidate, postMultiple };
