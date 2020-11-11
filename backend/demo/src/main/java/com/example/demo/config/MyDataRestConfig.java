package com.example.demo.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;


@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	private EntityManager entityManager;
	
	@Autowired
	public MyDataRestConfig(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}
	
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

        exposeIds(config); //jer rest po defaultu u JSONu ne izbaci id
        
        config.setDefaultPageSize(100); //zelim da mi po defaultu vraca 100 elemenata po stranici
        
    }
    
    
    private void exposeIds(RepositoryRestConfiguration config) {
    	
    	//expose entity ids
    	//
    	
    	//-gets a list of all entity classes from the entity manager
    	Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
    	
    	//-create an array of the entity types
    	List<Class> entityClasses = new ArrayList<>();
    	
    	//-get the entity types for the entities
    	for(EntityType tempType: entities) {
    		entityClasses.add(tempType.getJavaType());
    	}
    	
    	//-expose the entity ids for the array of the entity/domain types
    	Class[] domainTypes = entityClasses.toArray(new Class[0]);
    	config.exposeIdsFor(domainTypes);
    }
    
}
