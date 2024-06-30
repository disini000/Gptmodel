package com.Codefellas.sinhalaGPT.mAIBot;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document(collection = "AIBot")
public class Bot {
    @Id
    private String id;
    private String question;
    private  String answer;
}
