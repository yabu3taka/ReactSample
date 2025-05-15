'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'ユーザ1',
      email: 'user1@example.com',
      password: 'passwd1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'ユーザ2',
      email: 'user2@example.com',
      password: 'passwd2',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
