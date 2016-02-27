class FaqQuestionSerializer < ActiveModel::Serializer
  attributes :id, :question, :answer
end
