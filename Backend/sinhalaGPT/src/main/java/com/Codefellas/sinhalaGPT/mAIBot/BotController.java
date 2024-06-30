package com.Codefellas.sinhalaGPT.mAIBot;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/bot")
@CrossOrigin(origins = "*")
public class BotController {
    private final BotService botService;

    @PostMapping("/add")
    public ResponseEntity<?> addQuery(@RequestBody BotRequest botRequest){
        try{
            if(botService.addquery(botRequest)){
                return ResponseEntity.ok().build();
            }else{
                return ResponseEntity.badRequest().build();
            }
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
