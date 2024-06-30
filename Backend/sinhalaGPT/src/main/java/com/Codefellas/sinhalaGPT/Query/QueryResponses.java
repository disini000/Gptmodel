package com.Codefellas.sinhalaGPT.Query;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class QueryResponses {
    private List<Query> Today;
    private List<Query> yesterday;
    private List<Query> before7;
}
