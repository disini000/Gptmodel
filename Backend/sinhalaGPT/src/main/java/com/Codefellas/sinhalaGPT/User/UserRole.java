package com.Codefellas.sinhalaGPT.User;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Role")
@Builder
public class UserRole {
    @Id
    String id;

    @Getter
    private Role name;
}
