package com.Codefellas.sinhalaGPT.Query;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/query")
@CrossOrigin(origins = "*")
public class QueryController {

    private  final QueryService queryService;

    @PostMapping("/{id}/{queryId}")
    public ResponseEntity<?> quering(
            @PathVariable String id,
            @PathVariable(required = false) String queryId,
            @RequestBody QueryRequest queryRequest){
        try{
            List<QueryResponse> queryResponseList = queryService.saveQuery(id,queryId,queryRequest);
            return ResponseEntity.ok(queryResponseList);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/getAll/{id}")
    public ResponseEntity<?> allQuery(@PathVariable String id){
        try{
            QueryResponses queryResponses =queryService.getAllQuery(id);
            return ResponseEntity.ok(queryResponses);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
