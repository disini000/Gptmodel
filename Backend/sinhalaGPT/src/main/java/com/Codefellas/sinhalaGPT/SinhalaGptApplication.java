package com.Codefellas.sinhalaGPT;

import com.Codefellas.sinhalaGPT.mAIBot.Bot;
import com.Codefellas.sinhalaGPT.mAIBot.BotRepository;
import com.Codefellas.sinhalaGPT.mAIBot.BotService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class SinhalaGptApplication implements CommandLineRunner {
	private final BotService botService;
	private final BotRepository botRepository;

    public SinhalaGptApplication(BotService botService, BotRepository botRepository) {
        this.botService = botService;
        this.botRepository = botRepository;
    }


    public static void main(String[] args) {
		SpringApplication.run(SinhalaGptApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
			List<Bot> bot2 = botRepository.findAll();
			if(bot2.isEmpty()){
				botService.DefaultQuestion();
			}
		}

}
