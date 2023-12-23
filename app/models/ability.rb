# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user.present?  # additional checks for logged in users

    if user.role == 'librarian'
      can :manage, Book
      can :read, User
      can :manage, Borrowing
    elsif user.role == 'member'
      can :read, Book
      can :create, Borrowing
      can :read, Borrowing, user_id: user.id
    end
  end
end
