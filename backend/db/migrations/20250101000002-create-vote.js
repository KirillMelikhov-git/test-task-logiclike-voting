'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ideaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Ideas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ipAddress: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Индекс для быстрого подсчета голосов по IP
    await queryInterface.addIndex('Votes', ['ipAddress'], {
      name: 'idx_votes_ip_address'
    });

    // Уникальный индекс для предотвращения повторного голосования
    await queryInterface.addIndex('Votes', ['ideaId', 'ipAddress'], {
      unique: true,
      name: 'idx_votes_unique_idea_ip'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Votes');
  }
};
