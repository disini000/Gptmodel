package com.Codefellas.sinhalaGPT.Query;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class QueryResponse {
    private String question;
    private String answer;
}
