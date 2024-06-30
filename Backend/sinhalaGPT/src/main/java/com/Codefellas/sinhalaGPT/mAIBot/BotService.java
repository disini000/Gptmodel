package com.Codefellas.sinhalaGPT.mAIBot;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BotService {

    private final BotRepository botRepository;

    public void DefaultQuestion(){
        Bot bot = Bot.builder()
                .question("Kohoma dha?".trim().toLowerCase())
                .answer("ආයුබෝවන්! අද මම ඔබට උදව් කරන්නේ කෙසේද?")
                .build();
        botRepository.save(bot);
    }

    public boolean addquery(BotRequest botRequest) {

        Bot bot = Bot.builder()
                .answer(botRequest.getAnswer())
                .question(botRequest.getQuestion().toLowerCase().trim())
                .build();
        Optional<Bot> bot1 = botRepository.findByQuestion(botRequest.getQuestion().trim().toLowerCase());
        if(bot1.isEmpty()){
           botRepository.save(bot);
           return true;
        }
        return false;
    }
}
