const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var ScrumSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  sprintNumber: {
    type: Number,
    require: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  sp: [{
    achived: {
      type: Number,
      required: true
    },
    estimated: {
      type: Number,
      required: true
    }
  }]
});

ScrumSchema.methods.toJSON = function() {
  var scrum = this;
  var scrumObject = scrum.toObject();

  return _.pick(scrumObject, ['_id', 'teamName']);
};

ScrumSchema.methods.generateScrumTeam = function() {
  var scrum = this;
  var achived = 60;
  var estimated = 0;

  scrum.sp.push({
    achived,
    estimated
  });

  return user.save().then(() => {
    return token;
  });
};

ScrumSchema.statics.findByName = function(teamName) {
  var Scrum = this;

  return Scrum.findOne({
    '_id': _id,
    'teamName': teamName
  });
};

ScrumSchema.methods.removeTeam = function(teamName) {
  var team = this;

  return team.update({
    $pull: {
      teamName
    }
  });
};

ScrumSchema.pre('save', function(next) {
  var scrum = this;

  if (scrum.isModified('teamName')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(scrum.teamName, salt, (err, hash) => {
        scrum.teamName = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var Scrum = mongoose.model('Scrum', ScrumSchema);

module.exports = {
  Scrum
};
