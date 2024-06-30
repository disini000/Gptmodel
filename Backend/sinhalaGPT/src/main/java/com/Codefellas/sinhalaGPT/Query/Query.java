package com.Codefellas.sinhalaGPT.Query;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Query")
@Builder
public class Query {

    @Id
    private String id;
    private LocalDate date;
    private List<QueryRequest> queryRequestList;

}
