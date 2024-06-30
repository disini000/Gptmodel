package com.Codefellas.sinhalaGPT.mAIBot;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BotRepository extends MongoRepository<Bot,String> {

    Optional<Bot> findByQuestion(String question);
}
